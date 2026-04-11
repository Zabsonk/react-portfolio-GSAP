export class CommonUtils {
    /**
     * Returns random value from section.
     * @param min
     * @param max
     * @private
     */
    static getRandomValueFromSection(min: number, max: number): number {
        let value: number;
        if (min === max) {
            value = min;
        } else {
            value = Math.random() * (max - min) + min;
        }
        return value;
    }
}
