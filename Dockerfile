FROM rust:1.67

WORKDIR /usr/src/myapp
COPY . .

EXPOSE 8080

CMD ["cargo run"]