import PyPDF2
import io

def extract_text_from_pdf(file_bytes: bytes) -> str:
    pdf_file = io.BytesIO(file_bytes)
    pdf_reader = PyPDF2.PdfReader(pdf_file)

    extracted_text = ""
    for page in pdf_reader.pages:
        text = page.extract_text()
        if text:
            extracted_text += text + "\n"
    
    return extracted_text.strip()