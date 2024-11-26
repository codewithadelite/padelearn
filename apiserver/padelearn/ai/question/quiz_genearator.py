from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import OpenAI
from langchain_core.output_parsers import JsonOutputParser
from .schemas import MCQResponse


class MCQGenerator:
    def __init__(self, temperature: float = 0.5):
        """Initializes the LLM chain and output parser."""
        self.temperature = temperature
        self.prompt_template = """
        Vous êtes une IA chargée de générer des questions à choix multiples basées sur le texte suivant. Veuillez créer 
        2 questions, chacune avec 3 réponses possibles, et assurez-vous que l'une des réponses est 
        correct. 
        Renvoie le résultat dans un format JSON structuré.
        
        Text: 
        {text}
        
        Instructions de formatage:
        {format_instructions}
        """
        self.output_parser = JsonOutputParser(pydantic_object=MCQResponse)

    def generate_mcqs(self, text: str) -> MCQResponse:
        """Generates multiple-choice questions for the given text chunk."""
        # Set up the prompt template and chain
        prompt = PromptTemplate.from_template(self.prompt_template)
        prompt = prompt.partial(
            format_instructions=self.output_parser.get_format_instructions()
        )

        llm = OpenAI(temperature=self.temperature)
        chain = prompt | llm | self.output_parser

        # Run the LLM chain and return the structured response
        struct_output = chain.invoke({"text": text})

        print("ai:")
        print(struct_output)

        return struct_output
