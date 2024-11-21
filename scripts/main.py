from langchain_openai import ChatOpenAI
import os
import dotenv
import json

# Load environment variables
dotenv.load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# Initialize the ChatOpenAI model
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=1.0,
    api_key=api_key,
)

def generate_poem(mood):
    messages = [
        (
            "system",
            "You are an expert Urdu poet skilled in writing long, elaborate, and emotionally resonant poems. "
            "You should always respond with poetry inspired by classical and modern Urdu styles, "
            "and include at least 8 lines of poetry. Frame the poetry in  Urdu  "
            "and explain the context of the mood before starting the poem."
        ),
        ("user", f"My mood is {mood}. Please compose exactly 4 sher (couplets) and no more, keeping it concise."),
    ]

    # Generate a response using the model
    response = llm.invoke(messages)
    return response.content

if __name__ == "__main__":
    import sys
    input_data = json.loads(sys.stdin.read())
    mood = input_data.get("mood", "neutral")

    # Generate the long poem
    result = generate_poem(mood)

    # Output the result as JSON
    print(json.dumps({"poem": result}))
