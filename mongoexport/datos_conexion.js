//ejecutar en  cmd, colocarse en la carpenta mongoexport del proyecto pacientes10
mongoexport --db=segunda --collection=camas --out=./Camas.json
mongoexport --db=segunda --collection=pacientes --out=./Pacientes.json
mongoexport --db=segunda --collection=admisions --out=./Admisions.json
mongoexport --db=segunda --collection=camahistorials --out=./CamaHistorial.json


mongoimport --db=segunda --collection=pacientes --file=./Pacientes.json
mongoimport --db=segunda --collection=camas --file=./Camas.json
mongoimport --db=segunda --collection=admisions --file=./Admisions.json
mongoimport --db=segunda --collection=camahistorials --file=./CamaHistorial.json

mongoexport --uri="mongodb+srv://incorpIner:incorpIner@cluster0.ouiva.mongodb.net/inspirA_inCorp-INER" --collection=camas --out=Camas.json
mongoimport --uri="mongodb+srv://incorpIner:incorpIner@cluster0.ouiva.mongodb.net/inspirA_inCorp-INER" --collection=camas --file=./Camas.json
