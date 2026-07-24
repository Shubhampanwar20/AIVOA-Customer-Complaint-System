from fastapi import APIRouter
from pydantic import BaseModel

from app.ai.graph import graph

router = APIRouter()


class ComplaintRequest(BaseModel):
    text: str


@router.post("/analyze")
async def analyze_complaint(request: ComplaintRequest):

    result = graph.invoke(
        {
            "text": request.text
        }
    )

    return {
        "ai_response": result["result"]
    }