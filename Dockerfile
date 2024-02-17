FROM rust:1.61.0
WORKDIR /usr/src/myapp
COPY . .
RUN cargo install –path .
EXPOSE 3000
CMD [cargo run]