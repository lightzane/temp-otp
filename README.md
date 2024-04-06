# Base32 Encoding

```
Base 32 Encoding

   The following description of base 32 is derived from [11] (with
   corrections).  This encoding may be referred to as "base32".

   The Base 32 encoding is designed to represent arbitrary sequences of
   octets in a form that needs to be case insensitive but that need not
   be human readable.

   A 33-character subset of US-ASCII is used, enabling 5 bits to be
   represented per printable character.  (The extra 33rd character, "=",
   is used to signify a special processing function.)

   The encoding process represents 40-bit groups of input bits as output
   strings of 8 encoded characters.  Proceeding from left to right, a
   40-bit input group is formed by concatenating 5 8bit input groups.
   These 40 bits are then treated as 8 concatenated 5-bit groups, each
   of which is translated into a single character in the base 32
   alphabet.  When a bit stream is encoded via the base 32 encoding, the
   bit stream must be presumed to be ordered with the most-significant-
   bit first.  That is, the first bit in the stream will be the high-
   order bit in the first 8bit byte, the eighth bit will be the low-
   order bit in the first 8bit byte, and so on.







Josefsson                   Standards Track                     [Page 8]

RFC 4648                    Base-N Encodings                October 2006


   Each 5-bit group is used as an index into an array of 32 printable
   characters.  The character referenced by the index is placed in the
   output string.  These characters, identified in Table 3, below, are
   selected from US-ASCII digits and uppercase letters.

                     Table 3: The Base 32 Alphabet

     Value Encoding  Value Encoding  Value Encoding  Value Encoding
         0 A             9 J            18 S            27 3
         1 B            10 K            19 T            28 4
         2 C            11 L            20 U            29 5
         3 D            12 M            21 V            30 6
         4 E            13 N            22 W            31 7
         5 F            14 O            23 X
         6 G            15 P            24 Y         (pad) =
         7 H            16 Q            25 Z
         8 I            17 R            26 2

   Special processing is performed if fewer than 40 bits are available
   at the end of the data being encoded.  A full encoding quantum is
   always completed at the end of a body.  When fewer than 40 input bits
   are available in an input group, bits with value zero are added (on
   the right) to form an integral number of 5-bit groups.  Padding at
   the end of the data is performed using the "=" character.  Since all
   base 32 input is an integral number of octets, only the following
   cases can arise:

   (1) The final quantum of encoding input is an integral multiple of 40
       bits; here, the final unit of encoded output will be an integral
       multiple of 8 characters with no "=" padding.

   (2) The final quantum of encoding input is exactly 8 bits; here, the
       final unit of encoded output will be two characters followed by
       six "=" padding characters.

   (3) The final quantum of encoding input is exactly 16 bits; here, the
       final unit of encoded output will be four characters followed by
       four "=" padding characters.

   (4) The final quantum of encoding input is exactly 24 bits; here, the
       final unit of encoded output will be five characters followed by
       three "=" padding characters.

   (5) The final quantum of encoding input is exactly 32 bits; here, the
       final unit of encoded output will be seven characters followed by
       one "=" padding character.
```

Reference: https://datatracker.ietf.org/doc/html/rfc4648#section-6
