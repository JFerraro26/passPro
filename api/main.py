from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import events_router, sales_router, accounts_router, states_router
from authenticator import authenticator


app = FastAPI()
app.include_router(accounts_router.router)
app.include_router(authenticator.router)

app.include_router(events_router.router)
app.include_router(sales_router.router)
app.include_router(states_router.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def test_root():
    return {"Hello There, If you see this message that means it's working"}
