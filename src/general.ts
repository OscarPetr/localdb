export function generate(length: number): string {
    var chars = 'qwertyuiopasdfghjklzxcvbnm';
    var generation = '';
    for (var i = 0; i < length; i++) {
        generation += chars[Math.floor(Math.random() * chars.length)];
    }
    return generation;
}