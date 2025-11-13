package models

type User struct {
	ID                   int    `json:"id"`
	Email                string `json:"email"`
	Password             string `json:"password"`
	Date_of_registration bool   `json:"date_of_registration"`
}