#!/bin/bash

BASE="/home/node/app/develop"

${BASE}/vasm/vasmm68k_mot -kick1hunks -Fhunkexe -I${BASE}/NDK_3.1/Include_Libs/include_i -o ${1/.asm/} -nosym $1
