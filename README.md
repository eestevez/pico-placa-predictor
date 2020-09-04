# Pico & Placa predictor
Pico y placa Literally 'Peak and Plate' (Spanish for peak [hour] and [license] plate") is a driving restriction policy aimed to mitigate traffic congestion [ [1] ].

The goal of this project is to "predict" if a car can be on the road following the pico & placa rules applied in Quito, Ecuador's capital city.

## Program input and output
The program have the following input and output:
* Input: 1) a license plate number (the full number, not the last digit), 2) a date (as a String), 3) a time
* Output: The program will return whether or not that car can be on the road

## Rules

The logic of the program is based on the following rules:

<em><strong>Pico & placa</strong></em> [ [2] ] :

* The circulation restriction will apply from Monday to Friday; in the morning, between <strong>7:00 am and 9:30 am</strong>; and, in the afternoon and evening, between <strong>16:00 pm and 19:30 pm</strong> according to the following calendar:

  | Day of week        | Last digit of the license plate of the car for which the restriction applies |     
  |--------------------|:---------------------------------------------------------------------------------|
  | Monday              |  1 y 2                                                                          |
  | Tuesday             |  3 y 4                                                                          |
  | Wednesday           |  5 y 6                                                                          |
  | Thursday            |  7 y 8                                                                          |
  | Friday              |  9 y 0                                                                          |
  | Saturday            |  None                                                                           |
  | Sunday              |  None                                                                           |

  <strong>The following cars service type are exempted from the circulation restriction: </strong>
* Government, Official and Decentralized autonomous government cars
* Cars for Diplomatic, Consular and International Organizations or Technical Assistance use
* Cars for Public and commercial service (Ex. Taxis, Buses)


<em><strong>car plate features</strong></em> [ [3] ] :
* They consist of three letters and three (old format) or four (new format) digits, starting from 000 to 9999, in formats of ABC-123 (old format) and ABC-1234 (new format). 
* The first letter of the plate is defined by the province where the circulation permission of the car was issued: Azuay (A), Bolívar (B), Cañar (U), Carchi (C), Cotopaxi (X), Chimborazo (H), El Oro (O), Esmeraldas (E), Francisco de Orellana (Q), Galápagos (W), Guayas (G), Imbabura (I), Loja (L), Los Ríos (R), Manabí (M), Morona (V), Napo (N), Pastaza (S), Pichincha (P), Santa Elena (Y), Santo Domingo de los Tsáchilas (J), Sucumbíos (K), Tungurahua (T), Zamora (Z)
* The second letter identifies the type of car service: Government cars (E), Official cars (X), Decentralized autonomous government cars (M or S), Public and commercial service cars (A or U or Z), Private cars (Any letter except the above).
* Also, there are cars with specific plate structure 2 letters only: Consular corps (CC), Diplomatic corps (CD), International Organizations (OI), Technical Assistance (AT), International temporal cars (IT).

PD: 
- The Armed Forces of Ecuador cars plates and others are not considered
- Holidays are not considered in the analysis

[1]: https://en.wikipedia.org/wiki/Pico_y_placa
[2]: http://www.amt.gob.ec/files/AMT-ORDM-305-CIRCULACION-VEHICULAR-PICO-Y-PLACA.pdf
[3]: https://es.wikipedia.org/wiki/Matr%C3%ADculas_automovil%C3%ADsticas_de_Ecuador

### References
[1]. Pico & Placa. https://en.wikipedia.org/wiki/Pico_y_placa (spanish)\
[2]. Ordenanza Metropolitana de regulación de circulación vehicular pico y placa. http://www.amt.gob.ec/files/AMT-ORDM-305-CIRCULACION-VEHICULAR-PICO-Y-PLACA.pdf , pag. 4-5, (spanish)\
[3]. Matrículas automovilísticas de Ecuador. https://es.wikipedia.org/wiki/Matr%C3%ADculas_automovil%C3%ADsticas_de_Ecuador (spanish)