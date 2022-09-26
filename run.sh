docker-compose up --build -d
cd cloudterm/
mvn clean install
cd target/
java -jar cloudterm.jar