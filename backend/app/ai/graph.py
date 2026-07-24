import json
from typing import TypedDict
from langgraph.graph import StateGraph, END
from .groq_service import llm


class ComplaintState(TypedDict):
    text: str
    result: dict


def analyze_node(state):
    prompt = f"""
You are an expert pharmaceutical complaint analyst.

Read the complaint carefully and extract all available information.

Return ONLY valid JSON.

Use EXACTLY this JSON structure:

{{
  "complaintSource": "",
  "customerName": "",
  "productName": "",
  "productStrength": "",
  "batchNumber": "",
  "quantityAffected": "",
  "manufacturingDate": "",
  "expiryDate": "",
  "summary": "",
  "risk": "",
  "rootCause": "",
  "CAPA": ""
}}

Rules:
- Return ONLY JSON.
- Do NOT use markdown.
- Do NOT explain anything.
- If any value is missing, return an empty string.

Complaint:

{state["text"]}
"""

    response = llm.invoke(prompt)

    content = response.content.strip()

    if content.startswith("```json"):
        content = content.replace("```json", "").replace("```", "").strip()

    try:
        result = json.loads(content)
    except Exception:
        result = {
            "raw_response": content
        }

    return {
        "result": result
    }


builder = StateGraph(ComplaintState)

builder.add_node("analyze", analyze_node)

builder.set_entry_point("analyze")

builder.add_edge("analyze", END)

graph = builder.compile()