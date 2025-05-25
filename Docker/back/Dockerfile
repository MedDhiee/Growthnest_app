# Docker/backend.Dockerfile

FROM maven:3.9.5-eclipse-temurin-17 AS builder
WORKDIR /app
COPY ../Backend . 
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8089
ENTRYPOINT ["java", "-jar", "app.jar"]
