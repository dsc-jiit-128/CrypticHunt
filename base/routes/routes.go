package routes

import (
	"CrypticHunt/Backend/Sandhu-Sahil/base/controllers"
	"CrypticHunt/Backend/Sandhu-Sahil/base/middlewares"

	"github.com/gin-gonic/gin"
)

type RouterService struct {
	Controller controllers.Controller
}

func NewRouterService(Controller controllers.Controller) RouterService {
	return RouterService{
		Controller: Controller,
	}
}

func (rs *RouterService) RegisterRoutes(rg *gin.RouterGroup) {

	simpleGroup := rg.Group("v1") //without jwt
	{
		userSimpleGroup := simpleGroup.Group("/user")
		{
			userSimpleGroup.POST("/login", rs.Controller.Login)
			userSimpleGroup.POST("/register", rs.Controller.Register)
		}
	}

	jwtGroup := rg.Group("v2") //with jwt headers
	{
		jwtGroup.Use(middlewares.JwtAuthMiddleware())

		userGroup := jwtGroup.Group("/user")
		{
			userGroup.GET("/:id", rs.Controller.GetUser)
			userGroup.POST("/createTeam", rs.Controller.CreateTeam)
			userGroup.POST("/joinTeam/:id", rs.Controller.JoinTeam)
		}

		teamGroup := jwtGroup.Group("/team")
		{
			teamGroup.GET("/leaderboard", rs.Controller.TeamLeaderboard)
		}

		questionGroup := jwtGroup.Group("/question")
		{
			questionGroup.POST("/:id", rs.Controller.CheckQuestion)
		}
	}
}
