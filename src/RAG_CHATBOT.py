from langchain_openai import ChatGroq
from langchain.chains import RetrievalQA
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langgraph.graph import StateGraph, END

# 1. Connect to Llama 3.3-70B via ChatGroq API
llm = ChatGroq(
    model="llama-3.3-70b-versatile",   # Llama 3.3-70B Versatile
    temperature=0.2,
    groq_api_key="YOUR_CHATGROQ_API_KEY"
)

# 2. Load sample documents (could be PDFs, txt files, or DB docs)
docs = [
    "LangGraph is a framework for building stateful AI agents.",
    "RAG combines retrieval and generation for better accuracy.",
    "Llama 3.3-70B supports 32k tokens, making it ideal for long contexts."
]

# 3. Create a vector DB for retrieval
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")  # You can use other embeddings
vectorstore = FAISS.from_texts(docs, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

# 4. Define prompt template
prompt_template = """
You are a helpful assistant. 
Use the provided context to answer the question.

Context: {context}
Question: {question}

Answer:
"""
prompt = PromptTemplate(input_variables=["context", "question"], template=prompt_template)

# 5. Build a simple LangGraph pipeline
def retrieve_node(state):
    question = state["question"]
    retrieved_docs = retriever.get_relevant_documents(question)
    state["context"] = "\n".join([d.page_content for d in retrieved_docs])
    return state

def generation_node(state):
    formatted_prompt = prompt.format(context=state["context"], question=state["question"])
    response = llm.invoke(formatted_prompt)
    state["answer"] = response.content
    return state

# Graph definition
workflow = StateGraph(dict)

workflow.add_node("retrieve", retrieve_node)
workflow.add_node("generate", generation_node)

workflow.add_edge("retrieve", "generate")
workflow.set_entry_point("retrieve")
workflow.set_finish_point("generate")

# Compile the graph
app = workflow.compile()

# 6. Run the chatbot
user_question = "What is LangGraph and how does it relate to RAG?"
result = app.invoke({"question": user_question})

print("User Question:", user_question)
print("Chatbot Answer:", result["answer"])
