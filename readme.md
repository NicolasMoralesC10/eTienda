# NOTAS DEL PROYECTO 

- Tener en cuenta si no corre el node js habilitar ejecucion de scripr en win 11
-       ejecutamos en la consosla en modo admistradddor : Set-ExecutionPolicy RemoteSigned -Scope CurrentUser 
-       otra opcion es :Set-ExecutionPolicy Unrestricted

========================================================================

- usaremos 2 arquitecturas orientadas a servicios (API REST) para el backend
- Internamente usaremos MVC (tenga en cuenta que las vistas se remplazan por rutas)


1- creamos las carpetas para el MVC (controllers,models,routers)
2- instalamos los paquetes basicos : npm i nodemon express cors mongoose bcryptjs(encriptacion)  jsonwebtoken(tokens) multer(imagenes)

* documentacion de MONGO
- MongoDB : https://www.mongodb.com/docs/manual/reference/method/
- Mogoose (libreria que interactua entre node js y mongoDB) :
https://mongoosejs.com/docs/guide.html#methods