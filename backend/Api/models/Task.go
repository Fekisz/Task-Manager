package models

type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	State       bool   `json:"state"`
	ProjectID   int    `json:"project_id"`
}