from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import plotly.graph_objects as go
import pandas as pd
import yfinance as yf
from plotly.io import to_json
from fastapi.responses import JSONResponse

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to generate candlestick chart data as JSON
def graph_cg_json(symbol, df):
    fig = go.Figure(data=[go.Candlestick(
        x=df.index,
        open=df[('Open', symbol)],
        high=df[('High', symbol)],
        low=df[('Low', symbol)],
        close=df[('Close', symbol)],
        name=symbol
    )])

    fig.update_layout(
        title=f'{symbol} Stock Price',
        yaxis_title='Price (USD)',
        xaxis_title='Date',
        template='plotly_white',
        showlegend=True
    )
    return to_json(fig)

# Endpoint for fetching stock data and graph JSON
@app.get("/{symbol}")
async def get_stock_data(symbol: str):
    df = yf.download(symbol, start="2023-01-01", end="2024-12-31")
    fig_json = graph_cg_json(symbol, df)
    return JSONResponse(content=fig_json)
