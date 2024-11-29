import time


class DelayMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Delay before processing the request
        delay_seconds = 2  # Adjust the delay time in seconds
        # time.sleep(delay_seconds)

        response = self.get_response(request)

        # Optionally delay after processing the response
        # time.sleep(delay_seconds)

        return response
