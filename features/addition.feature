            # language: de
            @feature-1
            Funktionalität: Addition des Taschenrechners
            Als Buchhalter möchte ich zwei Zahlen miteinander addieren können,
            damit mir bei der Rechnungserstellung keine Fehler unterlaufen

            Grundlage:
            Gegeben sei ein Taschenrechner

            Szenariogrundriss: Addition von zwei Zahlen
            Wenn ich als erste Zahl <zahl1> eingebe
            Und ich als zweite Zahl <zahl2> eingebe
            Und ich Addition als Operation auswähle
            Und ich das Ergebnis berechne
            Dann erwarte ich <ergebnis> als Ergebnis
            Beispiele:
            | zahl1 | zahl2 | ergebnis |
            | 3     | 4     | 7        |
            | 3.3   | 4.4   | 7.7      |
            | 0     | 4     | 4        |
            | -1    | 4     | 3        |

Szenario: Addieren und Runden
Gegeben seien die addierten Zahlen 3.3 und 4.4
Wenn ich das Ergebnis runde
Dann erwarte ich 7 als Ergebnis

@a11y
Szenario: Nach einer Berechnung erwarte ich keine Barrierefreiheitsfehler
Gegeben seien die addierten Zahlen 5 und 5
Wenn ich das Ergebnis runde
Dann erwarte ich keine Barrierefreiheitsfehler auf dieser Seite

@a11y
Szenario: Nach einer Berechnung erwarte ich valides HTML
Gegeben seien die addierten Zahlen 5 und 5
Wenn ich das Ergebnis runde
Dann erwarte ich valides HTML auf dieser Seite

@sec
Szenario: Kontrolle der korrekten Header des Taschenrechners
Gegeben sei ein aktives Monitoring der HTTP-Requests des Browsers
Wenn ich den Taschenrechner öffne
Dann erwarte ich einen sicheren access-control-allow-origin Header der Web-Page
# Und erwarte ich einen gesetzten content-security-policy Header der Web-Page
# Und erwarte ich einen sicheren x-frame-options Header der Web-Page