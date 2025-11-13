package main

import (
	"Api/handlers"
	"log"
	"net/http"
	"strconv"
	"strings"
)



func main() {
	

	http.HandleFunc("/Project", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			handlers.ProjectHandler(w, r)
		}
		if r.Method == http.MethodPost {
			
			handlers.ProjectCreate(w, r)
		}
		
	})

	http.HandleFunc("/Project/", func(w http.ResponseWriter, r *http.Request) {
				idStr := strings.TrimPrefix(r.URL.Path, "/Project/")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}
		switch r.Method {
case http.MethodGet:
	

		handlers.ProjectHandlerById(w, r, id)
		case http.MethodDelete:
		handlers.ProjectDelete(w,r,id)
		default:
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		
	})



	http.HandleFunc("/Task", func(w http.ResponseWriter, r *http.Request) {
		
		switch r.Method {
case http.MethodPost:

		handlers.TaskCreate(w, r)
			
		
			
		default:
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

	})
	http.HandleFunc("/Task/", func(w http.ResponseWriter, r *http.Request) {
		idStr := strings.TrimPrefix(r.URL.Path, "/Task/")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "invalid id", http.StatusBadRequest)
			return
		}
		switch r.Method {
case http.MethodGet:

		handlers.TaskHandlerById(w, r, id)
			
		case http.MethodDelete:
			handlers.TaskDelete(w,r,id)
		case http.MethodPatch:
			handlers.TaskUpdate(w,r,id)
		default:
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

	})
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err.Error())
	}


	
}
