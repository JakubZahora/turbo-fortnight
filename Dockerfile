# Use a Rust base image
FROM rust:latest as builder

# Set working directory
WORKDIR /usr/src/turbo-fortnight

# Copy the Rust project files
COPY . .

# Build the Rust project with static linking
RUN cargo build --release

# Start a new stage and copy the built executable
FROM debian:latest

# Copy the executable from the previous stage
COPY --from=builder /usr/src/turbo-fortnight/target/release/turbo-fortnight /usr/local/bin/turbo-fortnight

EXPOSE 3000

# Run the executable
CMD ["turbo-fortnight"]