import uvicorn
import os
import sys

if __name__ == "__main__":
    # Ensure the current directory is in the path so 'app' can be imported
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    
    print("Starting server on http://localhost:8000 ...")
    
    # Run the server
    # Using 127.0.0.1 instead of 0.0.0.0 to fix localhost issues on Windows
    try:
        uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
    except Exception as e:
        print(f"Failed to start server: {e}")
