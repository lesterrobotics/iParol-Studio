import js

def generateCode(e):
    js.moveTo(js.currentFrame)
    frames = js.frames

    output_statements = generate_digital_write_statements(frames)
    arduinoCode = ""

    for statement in output_statements:
        arduinoCode = arduinoCode + "\n" + statement

    Element("arduinoCode").element.innerText = arduinoCode

def generate_digital_write_statements(frames):
    delay = Element("delayInput").element.value
    all_statements = []

    for i in range(len(frames) - 1):
        current_frame = frames[i]
        next_frame = frames[i + 1]
        prev_frame = frames[i - 1]

        # Set pins to HIGH in the current frame
        high_statements = [f'digitalWrite({pin}, HIGH);' for pin in current_frame if pin not in prev_frame]
        all_statements.extend(high_statements)

        # Add delay
        all_statements.append(f'delay({delay});')

        # Set pins to LOW in the next frame if not present
        low_statements = [f'digitalWrite({pin}, LOW);' for pin in current_frame if pin not in next_frame]
        all_statements.extend(low_statements)

    # Set pins to HIGH in the last frame
    last_frame_statements = [f'digitalWrite({pin}, HIGH);' for pin in frames[-1]]
    all_statements.extend(last_frame_statements)

    return all_statements
