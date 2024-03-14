function getLetterGrade(percentage: number): string {
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 63) return 'D';
    if (percentage >= 60) return 'D-';
    return 'F';
}

export function getSleepGrade(sleep: number): string {
    const grade = getLetterGrade(sleep);
    const sleepPercentage = sleep.toFixed(2);
    return `${grade} (${sleepPercentage}%)`;
}

export function getJournalGrade(score: number): string {
    const percentage = ((score + 1) / 2) * 100; // Mapping -1 to 1 range to 0-100
    const grade = getLetterGrade(percentage);
    const formattedPercentage = percentage.toFixed(2);
    return `${grade} (${formattedPercentage}%)`;
}

export function getOverallGrade(score: number): string {
    const percentage = score * 100; // Mapping 0 to 1 range to 0-100
    const grade = getLetterGrade(percentage);
    const formattedPercentage = percentage.toFixed(2);
    return `${grade} (${formattedPercentage}%)`;

}


