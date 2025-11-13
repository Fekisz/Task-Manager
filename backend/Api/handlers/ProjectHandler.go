package handlers

import (
	"Api/models"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/lib/pq"
)


func ProjectHandler(w http.ResponseWriter, r *http.Request) {

	var Projects []models.Project

	err := openWithDB(func(db *sql.DB) error {
		rows, err := db.Query("SELECT id, name, description, user_id FROM projects where user_id=1")
		if err != nil {
			return err
		}
		defer rows.Close()

		if( Projects == nil) {
	Projects = []models.Project{}
}
		for rows.Next() {
			var Project models.Project
			if err := rows.Scan(&Project.ID,&Project.Name, &Project.Description, &Project.Userid); err != nil {
				return err
			}
			Projects = append(Projects, Project)
		}
		return rows.Err()
	})

	if err != nil {
		http.Error(w, fmt.Sprintf("database error: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(Projects); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
	}
}


func ProjectHandlerById(w http.ResponseWriter, r *http.Request, id int) {

	var Projects []models.Project

	err := openWithDB(func(db *sql.DB) error {
		rows, err := db.Query("SELECT id, name, description, user_id FROM projects where user_id=1 AND id="+ fmt.Sprint(id))
		if err != nil {
			return err
		}
		defer rows.Close()

		for rows.Next() {
			var Project models.Project
			if err := rows.Scan(&Project.ID, &Project.Name,&Project.Description, &Project.Userid); err != nil {
				return err
			}
			Projects = append(Projects, Project)
		}
		return rows.Err()
	})

	if err != nil {
		http.Error(w, fmt.Sprintf("database error: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(Projects); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
	}
}
func ProjectDelete(w http.ResponseWriter, r *http.Request, id int) {

	

	err := openWithDB(func(db *sql.DB) error {
		db.Exec("Delete from tasks where project_id="+ fmt.Sprint(id))
		db.Exec("Delete from projects where id="+ fmt.Sprint(id))
		return nil
	})

	if err != nil {
		http.Error(w, fmt.Sprintf("database error: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	
}
func ProjectCreate(w http.ResponseWriter, r *http.Request) {
	var Projects []models.Project
	var content models.Project
			if err := json.NewDecoder(r.Body).Decode(&content); err != nil {
				http.Error(w, "invalid request body", http.StatusBadRequest)
				return
			} 

			

	err := openWithDB(func(db *sql.DB) error {
		 db.Exec("INSERT INTO projects (name, description, user_id) VALUES ('"+content.Name+"', '"+content.Description+"', 1);")
	
		return nil
	})

	if err != nil {
		http.Error(w, fmt.Sprintf("database error: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(Projects); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
	}
}