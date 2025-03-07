use axum::{
    routing::get,
    Router,
    response::Json,
    extract::Extension,
};
use serde::Serialize;
use serde_json::json;
use sqlx::PgPool;

// Define the User struct
#[derive(Serialize)]
struct User {
    id: i32,
    username: String,
    email: String,
}

// Create the router and pass the database pool
pub fn create_router(pool: PgPool) -> Router {
    Router::new()
        .route("/api/users", get(get_users))
        .route("/api/hello", get(hello_handler))
        .layer(Extension(pool))
}

// Handler function for the `/api/users` route
async fn get_users(Extension(pool): Extension<PgPool>) -> Json<serde_json::Value> {
    let users = sqlx::query_as!(User, "SELECT id, username, email FROM turbo_fortnight.users")
        .fetch_all(&pool)
        .await
        .expect("Error loading users");

    Json(json!(users))
}

// Handler function for the `/api/hello` route
async fn hello_handler() -> Json<serde_json::Value> {
    Json(json!({ "message": "Hello from the Rust backend!" }))
}