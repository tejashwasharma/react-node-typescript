import * as Sequelize from 'sequelize/lib/sequelize';
import * as express from "express";
import * as bodyParser from "body-parser";
import {validate} from "class-validator";
import { Models } from './validator';
import { create } from 'domain';

class App{
  public sequelize;
  public User;
  public Events;
  public Login;
  public app;
  public port: number = 8000;
  constructor(){
    this.app = express();
    this.sequelize = new Sequelize('UserDB', 'root' , 'root', {
      dialect: 'mysql'
    });
    this.User = this.sequelize.define('User_details', {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      address: Sequelize.STRING,
      role: Sequelize.STRING,
      category: Sequelize.STRING
    });
    this.Events = this.sequelize.define('Event_logs', {
      log_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      event: Sequelize.STRING
    });
    this.Login = this.sequelize.define('Login', {
      username: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      password: Sequelize.STRING
    },        {
      tableName: 'Login'
  });
    this.sequelize.sync({
      logging: console.log
    }).then( () => {
      console.log("connected");
    }).catch( (err) => {
      console.error(err);
    });
    let Model = new Models()
    this.routes(Model);
  }

  routes(Model){
    this.app.use(bodyParser.json());
    this.app.listen( this.port, () => {
        console.log( `server started at http://localhost:${ this.port }` );
    });
    this.app.post( "/adduser", ( req, res ) => {
      Model.user_id = parseInt(req.body.user_id);
      Model.name = req.body.name;
      Model.email = req.body.email;
      Model.address = req.body.address;
      Model.role = req.body.role;
      Model.category = req.body.category;
      validate(Model).then( errors => {
        console.log(errors);        
        if (errors.length > 0){
          res.send(403)
        }
        else{
          this.User.create(req.body).then( () => {
            this.Events.create({event:'inserted '+ JSON.stringify(req.body)})
            res.send(200);
          })
        }
      })
    })
    this.app.post( "/deleteuser", ( req, res ) => {
      Model.user_id = req.body.user_id;
      Model.name = req.body.name;
      Model.email = req.body.email;
      Model.address = req.body.address;
      Model.role = req.body.role;
      Model.category = req.body.category;
      validate(Model).then( errors => {
        console.log(errors);        
        if (errors.length > 0){
          res.send(403)
        }
        else{
          this.User.destroy({ where: { user_id: req.body.user_id } }).then( () => {
            this.Events.create({event:'Deleted '+ JSON.stringify(req.body)})
            res.send(200);
          });
        }
      })
    })
    this.app.post( "/finduser", ( req, res ) => {
      this.User.findAll({
        attributes: ['user_id', 'name', 'category']
      }).then( (data) => {   
        res.send(data);
      });
    })
    this.app.post( "/updateuser", ( req, res ) => {
      Model.user_id = req.body.user_id;
      Model.name = req.body.name;
      Model.email = req.body.email;
      Model.address = req.body.address;
      Model.role = req.body.role;
      Model.category = req.body.category;
      validate(Model).then( errors => {
        console.log(errors);        
        if (errors.length > 0){
          res.send(403)
        }
        else{
          this.User.findAll({ where: { user_id: req.body.user_id } }).then( (data) => {
            this.User.update(req.body ,{ where: { user_id: req.body.user_id } }).then( () => {
              this.Events.create({event:'Updated '+ JSON.stringify(req.body)})
              res.send(200);
            });
          });
        }
      })
    })
    this.app.post( "/findeventlogs", ( req, res ) => {
      this.Events.findAll().then( (data) => {
        res.send(data);
      });
    })
    this.app.post("/login", (req, res) => {
      this.Login.findAll({username: req.body.username, password:req.body.password }).then( () => {
        res.send(200);
      })
    })
  }
}


new App();