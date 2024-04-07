mod models;

use crate::models::User;

use axum::{
    extract::State,
    http::StatusCode,
    routing::get,
    Router,
    Json,
};
use sqlx::postgres::{PgPool, PgPoolOptions};
use tokio::net::TcpListener;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use tower_http::{
    services::ServeDir,
};
use std::time::Duration;

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "example_tokio_postgres=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    dotenv::dotenv().ok();

    let db_connection_str = "postgres://turboadmin:turbofortnight@turbo-fortnight-pgsql-01.cx40oa2q0783.us-east-2.rds.amazonaws.com:5432/postgres".to_string();

    // set up connection pool
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .acquire_timeout(Duration::from_secs(3))
        .connect(&db_connection_str)
        .await
        .expect("can't connect to database");
    
    let serve_dir = ServeDir::new("assets");

    // build our application with some routes
    let app = Router::new()
        .nest_service("/", serve_dir.clone())
        .route(
            "/dbCheck",
            get(using_connection_pool_extractor),
        )
        .route(
            "/getUsers",
            get(get_users),
        )
        .with_state(pool);

    // run it with hyper
    let listener = TcpListener::bind("0.0.0.0:3001").await.unwrap();
    tracing::debug!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

// we can extract the connection pool with `State`
async fn using_connection_pool_extractor(
    State(pool): State<PgPool>,
) -> Result<String, (StatusCode, String)> {
    sqlx::query_scalar("select 'hello world from pg'")
        .fetch_one(&pool)
        .await
        .map_err(internal_error)
}

async fn get_users(State(pool): State<PgPool>) -> Json<Vec<User>> {
    let users = sqlx::query_as!(User, "SELECT id, name FROM users")
        .fetch_all(&pool)
        .await
        .unwrap_or_else(|_| vec![]);

    Json(users)
}

/// Utility function for mapping any error into a `500 Internal Server Error`
/// response.
fn internal_error<E>(err: E) -> (StatusCode, String)
where
    E: std::error::Error,
{
    (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
}