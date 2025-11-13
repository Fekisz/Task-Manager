package handlers

import (
	"Api/models"
	"database/sql"
	"encoding/json"

	"fmt"

	"net/http"
	"os"

	_ "github.com/lib/pq"
)

// openWithDB connects to DB, runs a callback, and ensures cleanup
func openWithDB(callback func(*sql.DB) error) error {
	connStr:= os.Getenv("DATABASE_URL")
	if connStr == "" {
		return fmt.Errorf("DATABASE_URL environment variable is not set")
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return err
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		return err
	}

	return callback(db)
}



func TaskHandlerById(w http.ResponseWriter, r *http.Request, id int) {

	var tasks []models.Task

	err := openWithDB(func(db *sql.DB) error {
		rows, err := db.Query("SELECT id, title, state, project_id FROM tasks where project_id="+ fmt.Sprint(id))
		if err != nil {
			return err
		}
		defer rows.Close()
		if tasks == nil {
    tasks = []models.Task{}
}

		for rows.Next() {
			var task models.Task
			if err := rows.Scan(&task.ID, &task.Title, &task.State, &task.ProjectID); err != nil {
				return err
			}
			tasks = append(tasks, task)
		}
		return rows.Err()
	})

	if err != nil {
		http.Error(w, fmt.Sprintf("database error: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(tasks); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
	}
}
func TaskDelete(w http.ResponseWriter, r *http.Request, id int) {

	

	err := openWithDB(func(db *sql.DB) error {
		db.Exec("Delete  from tasks where id="+ fmt.Sprint(id))

		return nil
	})

	if err != nil {
		http.Error(w, fmt.Sprintf("database error: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	
}
func TaskUpdate(w http.ResponseWriter, r *http.Request, id int) {
   
    var payload struct {
        State *bool `json:"State"`
    }
    if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
        http.Error(w, "invalid request body", http.StatusBadRequest)
        return
    }
    if payload.State == nil {
        http.Error(w, "missing State field", http.StatusBadRequest)
        return
    }

    err := openWithDB(func(db *sql.DB) error {
        res, err := db.Exec("UPDATE tasks SET state = $1 WHERE id = $2", *payload.State, id)
        if err != nil {
            return err
        }
        ra, err := res.RowsAffected()
        if err != nil {
            return err
        }
        if ra == 0 {
            
            return sql.ErrNoRows
        }
        return nil
    })

    if err != nil {
        if err == sql.ErrNoRows {
            http.Error(w, "task not found", http.StatusNotFound)
            return
        }
        http.Error(w, fmt.Sprintf("database error: %v", err), http.StatusInternalServerError)
        return
    }

  
    w.WriteHeader(http.StatusNoContent)
}

func TaskCreate(w http.ResponseWriter, r *http.Request) {
	var tasks []models.Task
	var content models.Task
			if err := json.NewDecoder(r.Body).Decode(&content); err != nil {
				http.Error(w, "invalid request body", http.StatusBadRequest)
				return
			} 


	err := openWithDB(func(db *sql.DB) error {
		_, err := db.Exec("INSERT INTO tasks (title, state, project_id) VALUES ($1, $2, $3)", content.Title, content.State, content.ProjectID)
		if err != nil {
			return err
		}
		return nil
	})

	if err != nil {
		http.Error(w, fmt.Sprintf("database error: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(tasks); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
	}
}