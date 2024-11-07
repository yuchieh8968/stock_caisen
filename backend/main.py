import plotly.graph_objects as go
import pandas as pd
import yfinance as yf
from fastapi import FastAPI

# 畫圖
def graph_cg(symbol, df):
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
    fig.show()

# 畫線方式一
def method1(symbol,df):
    pass

# 統一數據
def handle_data(df):
    pass


app = FastAPI()
# fastapi run main.py
@app.get("/{symbol}")
async def read_root(symbol: str):
    df = yf.download(symbol, start="2023-01-01", end="2024-12-31")
    graph_cg(symbol, df)
    return {"Message": f"Graph generated for {symbol}"}



