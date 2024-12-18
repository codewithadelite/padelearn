from typing import List
import random


def pick_random_numbers(numbers: List[int], total: int):
    """
    Pick a specified number of random numbers from the given list.

    Args:
        numbers (list): The list of numbers to pick from.
        total (int): The total number of random numbers needed.

    Returns:
        list: A list of randomly picked numbers.

    Raises:
        ValueError: If the total requested is greater than the length of the list.
    """
    if total > len(numbers):
        return numbers
    return random.sample(numbers, total)
