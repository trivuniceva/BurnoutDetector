package burnoutrulesengine.burnoutrulesengine.model;

public class ChainFact {
    private String name;
    private double value;

    public ChainFact() {}

    public ChainFact(String name) {
        this.name = name;
    }

    public ChainFact(String name, double value) {
        this.name = name;
        this.value = value;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }

    @Override
    public String toString() {
        return "ChainFact{name='" + name + "', value=" + value + "}";
    }
}
