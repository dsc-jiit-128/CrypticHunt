package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Team struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name   string             `json:"name" bson:"name" binding:"required"`
	Leader primitive.ObjectID `json:"leader" bson:"leader"`
}

type Solution struct {
	ID      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Q1      bool               `json:"q1,default=false" bson:"q1,default=false" `
	Q1Time  time.Time          `json:"t1" bson:"t1"`
	Q2      bool               `json:"q2,default=false" bson:"q2,default=false"`
	Q2Time  time.Time          `json:"t2" bson:"t2"`
	Q3      bool               `json:"q3,default=false" bson:"q3,default=false"`
	Q3Time  time.Time          `json:"t3" bson:"t3"`
	Q4      bool               `json:"q4,default=false" bson:"q4,default=false"`
	Q4Time  time.Time          `json:"t4" bson:"t4"`
	Q5      bool               `json:"q5,default=false" bson:"q5,default=false"`
	Q5Time  time.Time          `json:"t5" bson:"t5"`
	Q6      bool               `json:"q6,default=false" bson:"q6,default=false"`
	Q6Time  time.Time          `json:"t6" bson:"t6"`
	Q7      bool               `json:"q7,default=false" bson:"q7,default=false"`
	Q7Time  time.Time          `json:"t7" bson:"t7"`
	Q8      bool               `json:"q8,default=false" bson:"q8,default=false"`
	Q8Time  time.Time          `json:"t8" bson:"t8"`
	Q9      bool               `json:"q9,default=false" bson:"q9,default=false"`
	Q9Time  time.Time          `json:"t9" bson:"t9"`
	Q10     bool               `json:"q10,default=false" bson:"q10,default=false"`
	Q10Time time.Time          `json:"t10" bson:"t10"`
	TeamID  primitive.ObjectID `json:"teamID" bson:"teamID"`
}

type Question struct {
	QuestionID string `json:"_id" bson:"_id"`
	Answer     string `json:"answer" bson:"answer"`
}

type Login struct {
	UserName string `json:"user_name" bson:"user_name" binding:"required,alphanum"`
	Password string `json:"password" bson:"password" binding:"required"`
}

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserName string             `json:"user_name" bson:"user_name" binding:"required,alphanum"`
	Email    string             `json:"email" bson:"email" binding:"required,email"`
	Password string             `json:"password" bson:"password" binding:"required"`
	Role     string             `json:"role" bson:"role"`
	Team     primitive.ObjectID `json:"team" bson:"team"`
}
