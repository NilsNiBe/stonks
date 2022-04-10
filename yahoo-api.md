# http://query2.finance.yahoo.com

## /v10/finance/quoteSummary/ABB.NS?modules=financialData

## Handelsplatz

yahoo verwendet die Daten von der NasdaqGS.
Es gibt pro Tag drei Handelszeiten:

- vorbörslich (z.B. von Fri Mar 25 2022 09:00:00 GMT+0100),
- regulär (z.B. von Fri Mar 25 2022 14:30:00 GMT+0100)
- nachbörslich (z.B. von Fri Mar 25 2022 21:00:00 GMT+0100 bis Sat Mar 26 2022 01:00:00 GMT+0100).

## Berechnung Gewinn/Verlust pro Tag

Der letzte Timestamp in den Chart-Daten zeigt die aktuellen Daten bzw. die Daten des letzten regulären Handelszeitpunkts an.

### Interval 1d

Der letzte Timestamp zeigt den Zeitpunkt des regulären Handelszeitraums an, davor kommt der reguläre Handelsanfang und davor die
regulären Handelsanfänge der jeweils vorherigen Tage.

Der G/V berechnet sich damit aus den Werten des letzten und des vorvorletzten (Anfang vorheriger Tage) Timestamps.
Beim vorvorletzten Timestamp wird der Closing-Wert verwendet.
