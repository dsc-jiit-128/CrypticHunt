package controllers

import (
	"errors"
	"net/http"

	"CrypticHunt/Backend/Sandhu-Sahil/base/services"
	"CrypticHunt/Backend/Sandhu-Sahil/base/token"

	"CrypticHunt/Backend/Sandhu-Sahil/base/models"

	"github.com/gin-gonic/gin"
)

type Controller struct {
	UserService services.Service
}

func New(userservice services.Service) Controller {
	return Controller{
		UserService: userservice,
	}
}

func (uc *Controller) Login(ctx *gin.Context) {
	var user models.Login
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, team, err := uc.UserService.LoginUser(&user)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	data := map[string]interface{}{
		"token": token,
		"isteam": team,
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Login verified", "data": data})
}

func (uc *Controller) Register(ctx *gin.Context) {
	var user models.User
	if err := ctx.ShouldBindJSON(&user); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if user.Email == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": errors.New("must provide all fields")})
		return
	}

	user.Role = "MEMBER"
	valid := services.IsPasswordValid(user.Password)
	if !valid {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Password", "message": "Password must contain UPPER CASE, LOWER CASE, SPECIAL CHARACTER, NUMBER and LENGTH>7"})
		return
	}

	token, err := uc.UserService.RegisterUser(&user)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data := map[string]string{
		"token": token,
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Registration success", "data": data})
}

func (uc *Controller) GetUser(ctx *gin.Context) {
	id := ctx.Param("id")

	user_id, _, _, err := token.ExtractTokenID(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if id == "0" {
		id = user_id
	}

	u, err := uc.UserService.GetUserByID(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "success", "data": u})
}

func (uc *Controller) CreateTeam(ctx *gin.Context) {
	var team models.Team
	if err := ctx.ShouldBindJSON(&team); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user_id, _, _, err := token.ExtractTokenID(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = uc.UserService.CreateNewTeam(&team, user_id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "team created successfully"})
}

func (uc *Controller) JoinTeam(ctx *gin.Context) {
	id := ctx.Param("id")

	user_id, _, _, err := token.ExtractTokenID(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = uc.UserService.JoinNewTeam(user_id, id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "team joined successfully"})
}

func (uc *Controller) CheckQuestion(ctx *gin.Context) {
	id := ctx.Param("id")

	user_id, _, _, err := token.ExtractTokenID(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var question models.Question
	if err := ctx.ShouldBindJSON(&question); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = uc.UserService.CheckQuestionAns(user_id, id, question.Answer)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "CONGRATULATIONS, correct answer"})
}

func (uc *Controller) TeamLeaderboard(ctx *gin.Context) {
	user, _, _, err := token.ExtractTokenID(ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data, err := uc.UserService.TeamLeaderboardData(user)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "success", "data": data})
}
