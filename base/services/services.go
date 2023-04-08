package services

import (
	"CrypticHunt/Backend/Sandhu-Sahil/base/models"
)

type Service interface {
	LoginUser(*models.Login) (string, error)
	RegisterUser(*models.User) (string, error)
	GetUserByID(string) (*models.User, error)
	CreateNewTeam(*models.Team, string) error
	JoinNewTeam(string, string) error
	// ListUserFromTeam(string) ([]*models.User, error)
}
