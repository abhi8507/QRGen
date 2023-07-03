from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import qrcode

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="template")


@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/generate-qr")
async def generate_qr(data: dict):
    print(data)
    text = data.get("data")

    # Generate the QR code image
    qr = qrcode.QRCode()
    qr.add_data(text)
    qr.make(fit=True)

    # Create a response JSON with the image URL
    print("URL Generated")
    image_url = "/static/qr_code.png"
    qr_image_path = "static/qr_code.png"
    qr.make_image().save(qr_image_path)

    return JSONResponse({"image_url": image_url})
