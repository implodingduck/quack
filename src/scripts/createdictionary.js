
const resp = await fetch('https://api.datamuse.com/words?sp=??????&md=df&max=300');

const respJson = await resp.json();

const dictionary = [];

for (const entry of respJson) {
    let temp = {};
    if (!entry.tags) {
        continue; // skip words without frequency tags
    }
    let frequency = parseFloat(entry.tags[0].split(':')[1]);
    if (frequency > 2.0){
        temp.frequency = frequency;
        // ignore the word if it has more than 2 of the same letter
        const letterCounts = {};
        for (const letter of entry.word) {
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        }
        if (Object.values(letterCounts).some(count => count > 2)) {
            continue;
        }
        temp.word = entry.word;
        if (!entry.defs) {
            continue; // skip words without definitions
        }
        // skip words that use the word in their definition
        if (entry.defs[0].toLowerCase().includes(entry.word.toLowerCase())) {
            continue;
        }
        temp.hint = entry.defs[0];
        
        temp.scramble = temp.word.split('').sort(() => Math.random() - 0.5).join('');
        if (temp.scramble === temp.word) {
            temp.scramble = temp.word.split('').sort(() => Math.random() - 0.6).join('');
        }
        dictionary.push(temp);
    }
    //console.log(entry);
}

//write to file
import { writeFileSync } from 'fs';
writeFileSync('dictionary.json', JSON.stringify(dictionary, null, 2));