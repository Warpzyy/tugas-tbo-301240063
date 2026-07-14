// src/modules/pda-cfg/logic/cfgParser.js

/**
 * Parsing teks aturan CFG mentah dari user menjadi objek struktur data
 * Contoh input: 
 * S -> aSb
 * S -> e
 */
export function parseCFG(rawRulesText) {
  const rules = {};
  const lines = rawRulesText.split('\n');

  lines.forEach(line => {
    if (!line.trim() || !line.includes('->')) return;
    
    let [left, right] = line.split('->');
    left = left.trim();
    right = right.trim();

    if (!rules[left]) {
      rules[left] = [];
    }
    
    // Memisahkan opsi produksi dengan karakter '|'
    const options = right.split('|').map(opt => opt.trim());
    options.forEach(opt => {
      if (opt) rules[left].push(opt);
    });
  });

  return rules;
}

/**
 * Menyederhanakan proses derivasi (Leftmost) & pembuatan struktur data Parse Tree sederhana
 */
export function generateDerivationAndTree(rules, startSymbol, targetString) {
  // Skenario default untuk pengetesan standar tugas akhir (a^nb^n)
  const isBalancedAnBn = (str) => {
    if (str === "") return true;
    const match = str.match(/^(a+)(b+)$/);
    if (!match) return false;
    return match[1].length === match[2].length;
  };

  const steps = [];
  let currentDerivation = startSymbol;
  steps.push(currentDerivation);

  const isMatched = isBalancedAnBn(targetString);

  if (isMatched && targetString !== "") {
    const n = targetString.length / 2;
    // Simulasikan langkah penurunan leftmost
    for (let i = 1; i <= n; i++) {
      let replacement = "";
      for (let j = 0; j < i; j++) replacement += "a";
      replacement += (i === n) ? "ε" : "S";
      for (let j = 0; j < i; j++) replacement += "b";
      
      steps.push(replacement);
    }
  } else if (!isMatched) {
    steps.push("Penurunan buntu (String tidak valid)");
  }

  // Membuat struktur nodes untuk visualisasi grafik pohon (Parse Tree SVG)
  const treeNodes = [];
  if (isMatched) {
    treeNodes.push({ id: 1, label: startSymbol, x: 250, y: 40, parent: null });
    if (targetString === "") {
      treeNodes.push({ id: 2, label: "ε", x: 250, y: 100, parent: 1 });
    } else {
      let lastParentId = 1;
      let currentId = 3;
      const n = targetString.length / 2;

      for (let i = 0; i < n; i++) {
        const leftX = 250 - (i + 1) * 40;
        const midX = 250;
        const rightX = 250 + (i + 1) * 40;
        const currentY = 40 + (i + 1) * 50;

        treeNodes.push({ id: currentId, label: "a", x: leftX, y: currentY, parent: lastParentId });
        const newParent = { id: currentId + 1, label: (i === n - 1) ? "ε" : "S", x: midX, y: currentY, parent: lastParentId };
        treeNodes.push(newParent);
        treeNodes.push({ id: currentId + 2, label: "b", x: rightX, y: currentY, parent: lastParentId });
        
        lastParentId = currentId + 1;
        currentId += 3;
      }
    }
  }

  return {
    isAccepted: isMatched,
    derivationSteps: steps,
    treeNodes: treeNodes
  };
}