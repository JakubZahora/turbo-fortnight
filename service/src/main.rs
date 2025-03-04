use axum::{
    routing::get,
    Router,
    response::Json
};
use serde_json::json;

#[tokio::main]
async fn main() {
    // build our application with a single route
    let app = Router::new().route("/your-endpoint", get(hello_handler));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// Handler function for the `/your-endpoint` route
async fn hello_handler() -> Json<serde_json::Value> {
    Json(json!({ "message": "Hello from the Rust backend!" }))
}