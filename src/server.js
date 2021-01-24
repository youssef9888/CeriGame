/******** Chargement des Middleware
 *
 ********/
const

const express = require('express');
const path = require("path");
var bodyParser = require('body-parser');
const crypto = require('crypto');
const pgClient  = require('pg');
const mongoClient = require('mongodb').MongoClient;
const mongoObjectId = require ('mongodb').ObjectId ;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); 
var cors = require('cors');
/******** Declaration des variables
 *
 ********/
const app = express();




const url= 'mongodb://127.0.0.1:27017/db';

app.use(session({
               secret:'gdfbl',
               saveUninitialized: false,
               resave: false,
               store: new MongoDBStore({
               uri: url,
               collection:'mysession3815',
               touchAfter: 24 * 3600
              }), 
            cookie: {maxAge: 24 * 3600 * 1000}
       }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/******** Configuration du serveur NodeJS - Port : 3200
 *
 ********/

var server = app.listen(3004 , function(){
    console.log('listening on port 3004');
});


const pgConnection = {user: 'uapv2000170', host: '127.0.0.1', database: 'etd', password: 'zj3gy4', port: '5432' };
 


app.get('/',(req,res )=> res.sendFile(path.join(__dirname , 'index.html'))) ;

/******** SQL Routes
 *
 ********/

app.post('/login', (req, res) => {
     // recp params
     const nom = req.body.nom;
     const pass = req.body.password;
     //crptage de mot de passe 
     const hashed_pass = crypto.createHash('sha1').update(pass).digest('hex');

     if(!nom || ! pass){
     	return res.status(400).send('Nom ou mot de passe non saisi');
     }
	  //instance de conexion 	    
      const pool = new pgClient.Pool(pgConnection);

      pool.connect(function(err, client, done) {

            if(err) {console.log('y a une erreur de connexion au serveur ' + err.stack);}  
            else{
                console.log('Connection etablit avec la BD pgSQL'); 
            }
            //requet sql
           const resultat = client.query("select * from fredouil.users where identifiant = $1 and motpasse = $2 ;" ,[nom,hashed_pass] ,(err,result) =>{

            if(err){

                console.log('ereur d execution');

            }

		    if(result.rows.length == 0){
	               
	        var responseObject = {'id' : 0} ;
	        res.status(200).send(responseObject);
	        console.log('aucun utilisateur avec ces identifiants');
	       

			}else{
                   
                  client.query('update fredouil.users set statut_connexion = 1 where id=$1',[result.rows[0].id],()=>{

                    if(err){

                      console.log('ereur d execution de la mise à jour');
      
                    }
                    
	                  req.session.isConnected = true;
	                  req.session.user_id = result.rows[0].id;
	                  req.session.identifiant = result.rows[0].identifiant; 
	                  req.session.nom = result.rows[0].nom; 
	                  req.session.prenom = result.rows[0].prenom;
	                  req.session.date_de_naissance = result.rows[0].date_naissance;
	                  req.session.statut = 1;
	                  req.session.humeur = result.rows[0].humeur;
                    
                    var last_connection = new Date();
                    var date = last_connection.getDate() + "/" + last_connection.getMonth() + "/" + last_connection.getFullYear();
                    var heure = last_connection.getHours() + ":" + last_connection.getMinutes();
                   
                     const responseObject = {

                      'id' : result.rows[0].id ,
                      'identifiant': result.rows[0].identifiant,
                      'nom' : result.rows[0].nom,
                      'prenom' : result.rows[0].prenom, 
                      'date_de_naissance' : result.rows[0].date_naissance, 
                      'status_de_connexion' : true,
                      'humeur' : result.rows[0].humeur,
                      'date' : last_connection.getFullYear(), 
                      'date' : date,
                      'heure' : heure
                      
                     };
                     // envoyer l'objet response 
                     res.status(200).send(responseObject);
                   
                  });
                 
            } 
      });
         client.release();
          
    });
})


app.post('/logout' ,(req,res)=>{

  const svalue = req.body.id;

    if(svalue !== null){
        //intance de connexion 
        var pool = new pgClient.Pool(pgConnection); 

	      //connexion
        pool.connect(function(err, client, done) {

            if(err) {
            	console.log('Erreur de connexion au serveur de données' + err.stack);
            }  
          
           
            client.query('update fredouil.users set statut_connexion = 0 where id=$1',[svalue],()=>{

	            if(err){
	              console.log('ereur d\'execution de la deconnexion de l\'utilisateur ');
	            }else{
               
	              console.log('utilisateur deconnecté avec succes');
                res.status(200).send(true);
	            }
            });

            client.release();
        });

    } 

    req.session.destroy();
  
});


/******** Mongodb Routes
 *
 ********/
app.get('/getThemes', (req, res)=>{

  mongoClient.connect(url, { useUnifiedTopology: true } ,(err, db) => {

    if(err){
        throw err ;
    }

    var mongo = db.db("db");

    mongo.collection('quizz').distinct('thème', (err,result)=>{

      if (err) throw err;
      res.status(200).send(result);
      db.close();

      console.log(result);

    });

  });

}) ;



app.post('/getQuizthemeQues' , (req,res)=>{

  

    mongoClient.connect(url, { useUnifiedTopology: true } ,(err, db) => {

      if(err){
          throw err ;
      }

      console.log('connecter avec succes!') ;
      var mongo = db.db("db");

      mongo.collection('quizz').find({'thème':req.body.theme}).toArray((err,result)=>{
    
     if (err) throw err;
            //recupartion des propsition aleatoirement 
            min = Math.ceil(1);
            max = Math.floor(30);
            const index = Math.floor(Math.random() * max-min)+min  ;
            console.log( result[0].quizz);
            var array = [ result[0].quizz[index] , result[0].quizz[index+1] , result[0].quizz[index+2] , result[0].quizz[index+3] , result[0].quizz[index+4]];
	        res.send( array);
            
        
        db.close();

      

      });
     
    });

}) ;
//recupertion de l'id via l'api cote client et le renvoye l'historque en fonction de l'id
app.get('/getHistoryByUser/:id',(req,res)=> {
     const pool = new pgClient.Pool(pgConnection);

      pool.connect(function(err, client, done) {
		    if(err) {console.log('y a une erreur de connexion au serveur ' + err.stack);}  
            else{
                console.log('Connection etablit avec la BD pgSQL'); 
            }

           const resultat = client.query("select * from fredouil.historique where id_user= $1;" ,[req.params.id] ,(err,result) =>{
              if (err) throw err;
              res.status(200).send(result.rows);
		    
		  
		  
		  
		  });
    

});
   

});
   
//reuperation des donnees cote client via api et l'insertion dans la base de donnes
app.post('/setHistory',function (req,res) {
     
     
    console.log(req.body.id);
    if(req.body.id == null)
    {
        res.status(500).send('No Id !');
    }else
    {
        const pool = new pgClient.Pool(pgConnection);
        pool.connect(function(err, client, done) {
			if(err) {console.log('y a une erreur de connexion au serveur ' + err.stack);}  
            else{
                console.log('Connection etablit avec la BD pgSQL'); 
            }
        if( (req.body.id != null) && (req.body.nbreponse != null)  )
        {
			console.log('Je suis la '); 
	
			 const resultat = client.query("INSERT INTO fredouil.historique VALUES (default,$1,now(),$5,$2,$3,$4);" ,[req.body.id, req.body.nbreponse,req.body.temps, req.body.score,req.body.niveau] ,(result,responseData) =>{
              if (err) throw err;
              res.status(200).send("success");
		    
		  console.log('Je suis la ');
		  
		  
		  });
            

           
        }
        
        });

    }
});

//reuperatin d'un utlisateur par id
app.get('/getUser/:id',function (req,res) {
	
	const pool = new pgClient.Pool(pgConnection);

      pool.connect(function(err, client, done) {
		    if(err) {console.log('y a une erreur de connexion au serveur ' + err.stack);}  
            else{
                console.log('Connection etablit avec la BD pgSQL'); 
            }

           const resultat = client.query("select * from fredouil.users where id = $1" ,[req.params.id] ,(err,result) =>{
              if (err) throw err;
              res.status(200).send(result.rows);
		    
		  
		  
		  
		  });
    

});
  
});


