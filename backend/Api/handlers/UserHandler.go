package handlers

import (
	"Api/models"
	"encoding/json"
	"net/http"
)

func UserHandler(w http.ResponseWriter, r *http.Request) {
	response := []models.User{
		{
			
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
		return
	}
}

func UserHandlerById(w http.ResponseWriter, r *http.Request, id int) {
	response := []models.User{
		{
			
		},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "failed to encode response", http.StatusInternalServerError)
		return
	}
}