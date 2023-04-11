package services

import (
	"CrypticHunt/Backend/Sandhu-Sahil/base/models"
)

type Service interface {
	LoginUser(*models.Login) (string, bool, error)
	RegisterUser(*models.User) (string, error)
	GetUserByID(string) (*models.User, error)
	CreateNewTeam(*models.Team, string) error
	JoinNewTeam(string, string) error
	TeamLeaderboardData(string) (map[string]interface{}, error)
	CheckQuestionAns(string, string, string) error
}
