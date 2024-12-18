from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import OpenAI
from langchain_core.output_parsers import JsonOutputParser
from .schemas import MCQResponse


class MCQGenerator:
    def __init__(self, temperature: float = 0.3):
        """Initializes the LLM chain and output parser."""
        self.temperature = temperature
        self.prompt_template = """
        Vous êtes une IA chargée de générer des questions à choix multiples basées sur le texte suivant et sur des 
        sources pertinentes disponibles sur Internet, en lien avec le même sujet. Les questions doivent approfondir les 
        concepts abordés dans le texte sans simplement tester la mémorisation du contenu exact. 
        Veuillez créer 2 questions, chacune avec 3 réponses possibles, et assurez-vous que l'une des réponses est 
        correcte.

        Renvoie UNIQUEMENT le résultat au format JSON structuré comme suit :

        ```json
        {{
            "questions": [
                {{
                    "question": "Your question here",
                    "answers": ["Option1", "Option2", "Option3"],
                    "correct_answer": "Correct answer here"
                }}
            ]
        }}
        ```
        
        Ne fournissez aucun texte en dehors du JSON structuré.
        
        Text: 
        {text}
        
        Instructions de formatage:
        {format_instructions}
        """
        self.output_parser = JsonOutputParser(pydantic_object=MCQResponse)

    def generate_mcqs(self, text: str) -> MCQResponse | dict:
        """Generates multiple-choice questions for the given text chunk."""
        try:
            # Set up the prompt template and chain
            prompt = PromptTemplate.from_template(self.prompt_template)
            prompt = prompt.partial(
                format_instructions=self.output_parser.get_format_instructions()
            )

            llm = OpenAI(temperature=self.temperature)
            chain = prompt | llm | self.output_parser

            # Run the LLM chain and return the structured response
            struct_output = chain.invoke({"text": text})

            return struct_output
        except Exception as e:
            print(e)
            return {}
