# `pip3 install assemblyai` (macOS)
# `pip install assemblyai` (Windows)

import assemblyai as aai

aai.settings.api_key = ""
transcriber = aai.Transcriber()

transcript = transcriber.transcribe("filename.wav")
# transcript = transcriber.transcribe("./my-local-audio-file.wav")

print(transcript.text)
