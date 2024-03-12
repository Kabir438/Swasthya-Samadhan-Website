export default function multiplyText(text: string, multiplicant: number): string {
    let toReturn = "";
    for (let i = 0; i < multiplicant; i++) {
        toReturn += text;
    }
    return toReturn;
}