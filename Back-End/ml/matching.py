from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_match_score(cv_text: str, job_text: str) -> float:
    documents = [cv_text, job_text]

    vectoriser = TfidfVectorizer(stop_words = 'english')
    tfidf_matrix = vectoriser.fit_transform(documents)

    similarity = (cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2]))[0][0]

    return round(similarity * 100, 2)

cv_text = "Python developer with experience in SQL and machine learning"
job_text = "Looking for a Python engineer skilled in SQL and AI"

print(calculate_match_score(cv_text, job_text))