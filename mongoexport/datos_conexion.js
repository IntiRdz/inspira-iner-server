//ejecutar en  cmd, colocarse en la carpenta mongoexport del proyecto pacientes10
mongoexport --db=agua --collection=camas --out=./Camas.json
mongoimport --db=agua --collection=camas --file=./Camas.json

mongoexport --uri="mongodb+srv://incorpIner:incorpIner@cluster0.ouiva.mongodb.net/inspirA_inCorp-INER" --collection=camas --out=Camas.json
mongoimport --uri="mongodb+srv://incorpIner:incorpIner@cluster0.ouiva.mongodb.net/inspirA_inCorp-INER" --collection=camas --file=./Camas.json
