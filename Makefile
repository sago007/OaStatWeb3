SRCDIR := src
BUILDDIR := build

#Compile with debug information or optimized.
ifeq ($(DEBUG),1)
BASE_CFLAGS += -c -g -DDEBUG=1 -Wall -std=c++11
else
BASE_CFLAGS += -c -O3 -Wall -std=c++11
endif

SOURCES := main.cpp OaStatWeb3.cpp OutputterBasic.cpp OutputterCtemplate.cpp OpenArenaConverters.cpp plotgenerator.cpp
OASTAT_WEB_OFILES := $(patsubst %.cpp,$(BUILDDIR)/%.o,$(SOURCES))

total: OaStatWeb3

clean:
	rm -f $(BUILDDIR)/*.o OaStatWeb3

OaStatWeb3: $(OASTAT_WEB_OFILES)
	$(CXX) -O -o OaStatWeb3 $(OASTAT_WEB_OFILES) -lcppdb -lcppcms -lctemplate

$(BUILDDIR)/%.o : $(SRCDIR)/%.cpp | $(BUILDDIR)
	$(CXX) -MD ${BASE_CFLAGS} -o $@ $<
	@mkdir -p .$(CROSS)deps; cp $(BUILDDIR)/$*.d .$(CROSS)deps/$*.P; \
             sed -e 's/#.*//' -e 's/^[^:]*: *//' -e 's/ *\\$$//' \
                 -e '/^$$/ d' -e 's/$$/ :/' < $(BUILDDIR)/$*.d >> .$(CROSS)deps/$*.P; \
             rm -f $(BUILDDIR)/$*.d

$(BUILDDIR):
	mkdir -p $(BUILDDIR)

-include .$(CROSS)deps/*.P
