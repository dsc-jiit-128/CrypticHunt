package services

import (
	"context"
	"errors"
	"strings"
	"time"

	"CrypticHunt/Backend/Sandhu-Sahil/base/models"
	"CrypticHunt/Backend/Sandhu-Sahil/base/token"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type ServiceImpl struct {
	solutioncollection *mongo.Collection
	teamcollection     *mongo.Collection
	usercollection     *mongo.Collection
	quecollection      *mongo.Collection
	ctx                context.Context
}

func NewService(solutionCollection *mongo.Collection, usercollection *mongo.Collection, teamCollection *mongo.Collection, queCollection *mongo.Collection, ctx context.Context) Service {
	return &ServiceImpl{
		solutioncollection: solutionCollection,
		teamcollection:     teamCollection,
		usercollection:     usercollection,
		quecollection:      queCollection,
		ctx:                ctx,
	}
}

func (u *ServiceImpl) GetUserByID(id string) (*models.User, error) {
	objectid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return &models.User{}, err
	}

	query := bson.D{bson.E{Key: "_id", Value: objectid}}
	var userFound *models.User
	err = u.usercollection.FindOne(u.ctx, query).Decode(&userFound)
	if err != nil {
		return &models.User{}, err
	}

	userFound.Password = "**PROTECTED**"
	return userFound, nil
}

func (u *ServiceImpl) RegisterUser(user *models.User) (string, error) {
	query := bson.D{bson.E{Key: "user_name", Value: user.UserName}}
	res, err := u.usercollection.Find(u.ctx, query)
	if err != nil {
		return "", err
	}
	// fmt.Print(res.RemainingBatchLength())
	if res.RemainingBatchLength() != 0 {
		return "", errors.New("user already existed (user name already registered)")
	}
	query = bson.D{bson.E{Key: "email", Value: user.Email}}
	res, err = u.usercollection.Find(u.ctx, query)
	if err != nil {
		return "", err
	}
	// fmt.Print(res.RemainingBatchLength())
	if res.RemainingBatchLength() != 0 {
		return "", errors.New("user already existed (email already registered)")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	user.Password = string(hashedPassword)

	//remove spaces in username
	user.UserName = strings.TrimSpace(user.UserName)

	userCreated, err := u.usercollection.InsertOne(u.ctx, user)
	if err != nil {
		return "", err
	}
	id := userCreated.InsertedID.(primitive.ObjectID).Hex()

	token, err := token.GenerateToken(id, user.UserName, user.Role, user.Team.Hex())
	if err != nil {
		return "", err
	}

	return token, nil
}

func (u *ServiceImpl) LoginUser(user *models.Login) (string, bool, error) {
	var userFound *models.User
	query := bson.D{bson.E{Key: "user_name", Value: user.UserName}}
	err := u.usercollection.FindOne(u.ctx, query).Decode(&userFound)
	if err != nil {
		return "", false, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(userFound.Password), []byte(user.Password))
	if err != nil {
		return "", false, err
	}

	token, err := token.GenerateToken(userFound.ID.Hex(), user.UserName, userFound.Role, userFound.Team.Hex())
	if err != nil {
		return "", false, err
	}
	var team = true
	if userFound.Team.IsZero() {
		team = false
	}

	return token, team, err
}

func (u *ServiceImpl) CreateNewTeam(team *models.Team, leader string) error {
	objectid, err := primitive.ObjectIDFromHex(leader)
	if err != nil {
		return err
	}
	query := bson.D{bson.E{Key: "_id", Value: objectid}}
	var userFound *models.User
	err = u.usercollection.FindOne(u.ctx, query).Decode(&userFound)
	if err != nil {
		return err
	}
	if userFound.Role == "LEADER" {
		return errors.New("already a leader can't create more teams")
	}
	if !userFound.Team.IsZero() {
		return errors.New("you are member to some team, You can't create another team, to create a team create a new account")
	}

	team.Leader = objectid

	teamCreated, err := u.teamcollection.InsertOne(u.ctx, team)
	if err != nil {
		return err
	}
	id := teamCreated.InsertedID.(primitive.ObjectID)

	var solutions models.Solution
	solutions.TeamID = id

	_, err = u.solutioncollection.InsertOne(u.ctx, solutions)
	if err != nil {
		return err
	}

	filter := bson.D{bson.E{Key: "_id", Value: objectid}}
	update := bson.D{bson.E{Key: "$set", Value: bson.D{bson.E{Key: "role", Value: "LEADER"}, bson.E{Key: "team", Value: id}}}}
	result, err := u.usercollection.UpdateOne(u.ctx, filter, update)
	if err != nil {
		return err
	}
	if result.MatchedCount != 1 {
		return errors.New("no matched document found for update")
	}

	return nil
}

func (u *ServiceImpl) JoinNewTeam(user string, joinid string) error {
	objectid, err := primitive.ObjectIDFromHex(user)
	if err != nil {
		return err
	}
	query := bson.D{bson.E{Key: "_id", Value: objectid}}
	var userFound *models.User
	err = u.usercollection.FindOne(u.ctx, query).Decode(&userFound)
	if err != nil {
		return err
	}
	if userFound.Role == "LEADER" {
		return errors.New("already a leader can't join more teams")
	}
	if !userFound.Team.IsZero() {
		return errors.New("you are member to some team, You can't join another team, to join a team create a new account")
	}

	joinobjectid, err := primitive.ObjectIDFromHex(joinid)
	if err != nil {
		return err
	}
	filter := bson.D{bson.E{Key: "_id", Value: objectid}}
	update := bson.D{bson.E{Key: "$set", Value: bson.D{bson.E{Key: "team", Value: joinobjectid}}}}
	result, err := u.usercollection.UpdateOne(u.ctx, filter, update)
	if err != nil {
		return err
	}
	if result.MatchedCount != 1 {
		return errors.New("no matched document found for update")
	}

	return nil
}

func (u *ServiceImpl) CheckQuestionAns(user string, queid string, ans string) error {
	objectid, err := primitive.ObjectIDFromHex(user)
	if err != nil {
		return err
	}
	query := bson.D{bson.E{Key: "_id", Value: objectid}}
	var userFound *models.User
	err = u.usercollection.FindOne(u.ctx, query).Decode(&userFound)
	if err != nil {
		return err
	}
	if userFound.Team.IsZero() {
		return errors.New("you are not member to any team")
	}

	query = bson.D{bson.E{Key: "_id", Value: queid}}
	var question *models.Question
	err = u.quecollection.FindOne(u.ctx, query).Decode(&question)
	if err != nil {
		return err
	}
	if question.Answer != ans {
		return errors.New("wrong answer")
	}

	filter := bson.D{bson.E{Key: "teamID", Value: userFound.Team}}
	update := bson.D{bson.E{Key: "$set", Value: bson.D{bson.E{Key: queid, Value: true}, bson.E{Key: "t" + string(queid[1]), Value: time.Now()}}}}
	result, err := u.solutioncollection.UpdateOne(u.ctx, filter, update)
	if err != nil {
		return err
	}
	if result.MatchedCount != 1 {
		return errors.New("no matched document found for update")
	}

	return nil
}

func (u *ServiceImpl) TeamLeaderboardData(user string) (map[string]interface{}, error) {
	objectid, err := primitive.ObjectIDFromHex(user)
	if err != nil {
		return nil, err
	}

	query := bson.D{bson.E{Key: "_id", Value: objectid}}
	var userFound *models.User
	err = u.usercollection.FindOne(u.ctx, query).Decode(&userFound)
	if err != nil {
		return nil, err
	}
	userFound.Password = "**PROTECTED**"

	var users []*models.User
	query = bson.D{bson.E{Key: "team", Value: userFound.Team}}
	cursor, err := u.usercollection.Find(u.ctx, query)
	if err != nil {
		return nil, err
	}
	for cursor.Next(u.ctx) {
		var user models.User
		err := cursor.Decode(&user)
		if err != nil {
			return nil, err
		}
		user.Password = "**PROTECTED**"
		users = append(users, &user)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	err = cursor.Close(u.ctx)
	if err != nil {
		return nil, err
	}
	if len(users) == 0 {
		return nil, errors.New("documents not found")
	}

	query = bson.D{bson.E{Key: "teamID", Value: userFound.Team}}
	var solutions *models.Solution
	err = u.solutioncollection.FindOne(u.ctx, query).Decode(&solutions)
	if err != nil {
		return nil, err
	}

	data := map[string]interface{}{
		"user":      userFound,
		"team":      users,
		"solutions": solutions,
	}
	return data, nil
}
